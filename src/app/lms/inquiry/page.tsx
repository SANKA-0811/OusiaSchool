'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { chatWithMentor, type ChatMessage } from '@/lib/gemini';
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
  orderBy,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

type Project = {
  id: string;
  title: string;
  vision: string;
  currentChallenge: string;
  messages: ChatMessage[];
  journal: string[];
  createdAt: Date;
};

type Phase = 'loading' | 'project_list' | 'new_project' | 'workspace';

export default function InquiryPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [phase, setPhase] = useState<Phase>('loading');
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // New project form
  const [newTitle, setNewTitle] = useState('');
  const [newVision, setNewVision] = useState('');
  const [newChallenge, setNewChallenge] = useState('');
  const [creating, setCreating] = useState(false);

  // Chat
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Journal
  const [journalInput, setJournalInput] = useState('');
  const [activeTab, setActiveTab] = useState<'chat' | 'journal'>('chat');

  // Challenge update
  const [editingChallenge, setEditingChallenge] = useState(false);
  const [newChallengeText, setNewChallengeText] = useState('');

  useEffect(() => {
    if (!loading && !user) router.replace('/lms/login');
    if (!loading && user) loadProjects();
  }, [user, loading]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeProject?.messages]);

  const loadProjects = async () => {
    setPhase('loading');
    try {
      const q = query(
        collection(db, 'inquiryProjects'),
        where('userId', '==', user!.uid),
        orderBy('createdAt', 'desc')
      );
      const snap = await getDocs(q);
      const loaded: Project[] = snap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<Project, 'id' | 'createdAt'>),
        createdAt: d.data().createdAt?.toDate() || new Date(),
      }));
      setProjects(loaded);
      setPhase('project_list');
    } catch (e) {
      setPhase('project_list');
    }
  };

  const createProject = async () => {
    if (!newTitle.trim() || !newVision.trim() || !newChallenge.trim()) return;
    setCreating(true);
    try {
      const initialMessage: ChatMessage = {
        role: 'model',
        parts: `はじめまして！私はあなたの探求学習メンターです。\n\nあなたのビジョン「${newVision}」、とても素晴らしいですね。\nまず最初に聞かせてください。「${newChallenge}」に取り組もうと思ったのは、どんなきっかけや疑問からですか？`,
      };

      const docRef = await addDoc(collection(db, 'inquiryProjects'), {
        userId: user!.uid,
        title: newTitle,
        vision: newVision,
        currentChallenge: newChallenge,
        messages: [initialMessage],
        journal: [],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      const newProject: Project = {
        id: docRef.id,
        title: newTitle,
        vision: newVision,
        currentChallenge: newChallenge,
        messages: [initialMessage],
        journal: [],
        createdAt: new Date(),
      };

      setProjects([newProject, ...projects]);
      setActiveProject(newProject);
      setPhase('workspace');
      setNewTitle('');
      setNewVision('');
      setNewChallenge('');
    } finally {
      setCreating(false);
    }
  };

  const openProject = (project: Project) => {
    setActiveProject(project);
    setPhase('workspace');
  };

  const sendMessage = async () => {
    if (!chatInput.trim() || !activeProject || chatLoading) return;
    const userMessage = chatInput.trim();
    setChatInput('');
    setChatLoading(true);

    const updatedMessages: ChatMessage[] = [
      ...activeProject.messages,
      { role: 'user', parts: userMessage },
    ];

    setActiveProject({ ...activeProject, messages: updatedMessages });

    try {
      const response = await chatWithMentor(
        activeProject.vision,
        activeProject.currentChallenge,
        activeProject.messages,
        userMessage
      );

      const finalMessages: ChatMessage[] = [
        ...updatedMessages,
        { role: 'model', parts: response },
      ];

      const updated = { ...activeProject, messages: finalMessages };
      setActiveProject(updated);

      await updateDoc(doc(db, 'inquiryProjects', activeProject.id), {
        messages: finalMessages,
        updatedAt: serverTimestamp(),
      });
    } catch (e) {
      const errorMessages: ChatMessage[] = [
        ...updatedMessages,
        { role: 'model', parts: '申し訳ありません。エラーが発生しました。もう一度お試しください。' },
      ];
      setActiveProject({ ...activeProject, messages: errorMessages });
    } finally {
      setChatLoading(false);
    }
  };

  const updateChallenge = async () => {
    if (!newChallengeText.trim() || !activeProject) return;
    const updated = { ...activeProject, currentChallenge: newChallengeText.trim() };
    setActiveProject(updated);
    setEditingChallenge(false);
    setNewChallengeText('');
    await updateDoc(doc(db, 'inquiryProjects', activeProject.id), {
      currentChallenge: newChallengeText.trim(),
      updatedAt: serverTimestamp(),
    });
  };

  const addJournal = async () => {
    if (!journalInput.trim() || !activeProject) return;
    const entry = journalInput.trim();
    setJournalInput('');
    const updated = { ...activeProject, journal: [...activeProject.journal, entry] };
    setActiveProject(updated);
    await updateDoc(doc(db, 'inquiryProjects', activeProject.id), {
      journal: updated.journal,
      updatedAt: serverTimestamp(),
    });
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-3">
          <button
            onClick={() => {
              if (phase === 'workspace' || phase === 'new_project') {
                setPhase('project_list');
                setActiveProject(null);
              } else {
                router.push('/lms');
              }
            }}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h1 className="font-bold text-gray-900">探求学習</h1>
          {activeProject && (
            <span className="text-gray-400 text-sm truncate hidden sm:block">
              / {activeProject.title}
            </span>
          )}
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Loading */}
        {phase === 'loading' && (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600" />
          </div>
        )}

        {/* Project List */}
        {phase === 'project_list' && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">探求プロジェクト</h2>
                <p className="text-gray-500 mt-1">あなたの探求のテーマを選んでください</p>
              </div>
              <button
                onClick={() => setPhase('new_project')}
                className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-all shadow-sm"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                新しいテーマ
              </button>
            </div>

            {projects.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">まだ探求テーマがありません</h3>
                <p className="text-gray-500 mb-6">
                  あなたが気になること、疑問に思うこと、挑戦したいことから
                  <br />探求テーマを設定してみましょう
                </p>
                <button
                  onClick={() => setPhase('new_project')}
                  className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-all"
                >
                  最初のテーマを作る
                </button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {projects.map((project) => (
                  <button
                    key={project.id}
                    onClick={() => openProject(project)}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-left hover:shadow-md hover:-translate-y-0.5 transition-all"
                  >
                    <h3 className="font-bold text-gray-900 text-lg mb-2">{project.title}</h3>
                    <p className="text-purple-600 text-sm font-medium mb-3">
                      ビジョン: {project.vision}
                    </p>
                    <p className="text-gray-500 text-sm line-clamp-2">
                      課題: {project.currentChallenge}
                    </p>
                    <div className="mt-4 flex items-center gap-4 text-xs text-gray-400">
                      <span>{project.messages.length} メッセージ</span>
                      <span>{project.journal.length} 記録</span>
                      <span className="ml-auto">
                        {project.createdAt.toLocaleDateString('ja-JP')}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* New Project Form */}
        {phase === 'new_project' && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">新しい探求テーマを設定する</h2>
            <p className="text-gray-500 mb-8">
              あなたが探求したいテーマについて教えてください
            </p>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  テーマ名
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="例: 気候変動と私たちの未来"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  ビジョン（大きな問い・夢）
                </label>
                <p className="text-xs text-gray-400 mb-2">
                  この探求を通じてどんな世界を実現したいですか？どんな疑問を持っていますか？
                </p>
                <textarea
                  value={newVision}
                  onChange={(e) => setNewVision(e.target.value)}
                  placeholder="例: 地球温暖化を止めるために、高校生の自分にできることを見つけたい"
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  最初の課題・問い
                </label>
                <p className="text-xs text-gray-400 mb-2">
                  まず最初に取り組みたい具体的な問いや課題を設定してください
                </p>
                <textarea
                  value={newChallenge}
                  onChange={(e) => setNewChallenge(e.target.value)}
                  placeholder="例: 日本の高校生が実際にCO2削減に貢献できる方法はあるのか？"
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={createProject}
                  disabled={creating || !newTitle || !newVision || !newChallenge}
                  className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {creating ? '作成中...' : '探求をスタート'}
                </button>
                <button
                  onClick={() => setPhase('project_list')}
                  className="px-6 py-3 bg-gray-100 text-gray-600 font-medium rounded-xl hover:bg-gray-200 transition-all"
                >
                  キャンセル
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Workspace */}
        {phase === 'workspace' && activeProject && (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left: Project Info */}
            <div className="lg:col-span-1 space-y-4">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <h3 className="font-bold text-gray-900 mb-4">{activeProject.title}</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-purple-600 uppercase tracking-wide mb-1">
                      ビジョン
                    </p>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {activeProject.vision}
                    </p>
                  </div>
                  <div className="border-t border-gray-100 pt-3">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        現在の課題
                      </p>
                      <button
                        onClick={() => {
                          setNewChallengeText(activeProject.currentChallenge);
                          setEditingChallenge(true);
                        }}
                        className="text-xs text-purple-500 hover:text-purple-700 transition-colors"
                      >
                        更新
                      </button>
                    </div>
                    {editingChallenge ? (
                      <div>
                        <textarea
                          value={newChallengeText}
                          onChange={(e) => setNewChallengeText(e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 text-sm border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none mb-2"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={updateChallenge}
                            disabled={!newChallengeText.trim()}
                            className="flex-1 py-1.5 bg-purple-600 text-white text-xs font-semibold rounded-lg hover:bg-purple-700 transition-all disabled:opacity-40"
                          >
                            保存
                          </button>
                          <button
                            onClick={() => setEditingChallenge(false)}
                            className="px-3 py-1.5 bg-gray-100 text-gray-500 text-xs rounded-lg hover:bg-gray-200 transition-all"
                          >
                            キャンセル
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {activeProject.currentChallenge}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
                  <p className="text-2xl font-bold text-purple-600">{activeProject.messages.length}</p>
                  <p className="text-xs text-gray-500 mt-1">メッセージ</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
                  <p className="text-2xl font-bold text-pink-600">{activeProject.journal.length}</p>
                  <p className="text-xs text-gray-500 mt-1">記録</p>
                </div>
              </div>
            </div>

            {/* Right: Chat & Journal */}
            <div className="lg:col-span-2">
              {/* Tabs */}
              <div className="flex bg-white rounded-xl shadow-sm border border-gray-100 p-1 mb-4">
                <button
                  onClick={() => setActiveTab('chat')}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    activeTab === 'chat' ? 'bg-purple-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  AIメンターと対話
                </button>
                <button
                  onClick={() => setActiveTab('journal')}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    activeTab === 'journal' ? 'bg-purple-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  学習記録
                </button>
              </div>

              {/* Chat Tab */}
              {activeTab === 'chat' && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col" style={{ height: '520px' }}>
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-5 space-y-4">
                    {activeProject.messages.map((msg, i) => (
                      <div
                        key={i}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        {msg.role === 'model' && (
                          <div className="w-7 h-7 bg-purple-100 rounded-full flex items-center justify-center mr-2 flex-shrink-0 mt-1">
                            <span className="text-xs text-purple-600 font-bold">M</span>
                          </div>
                        )}
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                            msg.role === 'user'
                              ? 'bg-purple-600 text-white rounded-br-sm'
                              : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                          }`}
                        >
                          {msg.parts}
                        </div>
                      </div>
                    ))}
                    {chatLoading && (
                      <div className="flex justify-start">
                        <div className="w-7 h-7 bg-purple-100 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                          <span className="text-xs text-purple-600 font-bold">M</span>
                        </div>
                        <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-3">
                          <div className="flex gap-1 items-center h-4">
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>

                  {/* Input */}
                  <div className="border-t border-gray-100 p-4">
                    <div className="flex gap-3">
                      <textarea
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            sendMessage();
                          }
                        }}
                        placeholder="メンターに質問や考えを伝えてください... (Enter で送信)"
                        rows={2}
                        className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none text-sm"
                      />
                      <button
                        onClick={sendMessage}
                        disabled={!chatInput.trim() || chatLoading}
                        className="px-4 py-2.5 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed self-end"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Journal Tab */}
              {activeTab === 'journal' && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5" style={{ minHeight: '520px' }}>
                  <h3 className="font-bold text-gray-900 mb-4">学習記録・気づきのメモ</h3>

                  {/* Add Entry */}
                  <div className="mb-6">
                    <textarea
                      value={journalInput}
                      onChange={(e) => setJournalInput(e.target.value)}
                      placeholder="今日の気づき、発見、疑問、次にやること... を自由に書いてください"
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none text-sm mb-3"
                    />
                    <button
                      onClick={addJournal}
                      disabled={!journalInput.trim()}
                      className="w-full py-2.5 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed text-sm"
                    >
                      記録する
                    </button>
                  </div>

                  {/* Journal Entries */}
                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    {activeProject.journal.length === 0 ? (
                      <p className="text-center text-gray-400 text-sm py-8">
                        まだ記録がありません。気づいたことをメモしてみましょう。
                      </p>
                    ) : (
                      [...activeProject.journal].reverse().map((entry, i) => (
                        <div
                          key={i}
                          className="bg-purple-50 border border-purple-100 rounded-xl p-4 text-sm text-gray-700 leading-relaxed"
                        >
                          <div className="flex items-start gap-2">
                            <span className="text-purple-400 text-xs mt-0.5 flex-shrink-0">
                              {activeProject.journal.length - i}
                            </span>
                            <p className="whitespace-pre-wrap">{entry}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
