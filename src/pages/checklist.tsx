import type { ReactNode } from 'react';
import { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

// ─── 型定義 ───────────────────────────────────────────────────────────────────

interface Tool {
  name: string;
  path: string;
}

interface Symptom {
  id: string;
  label: string;
  toolIds: string[];
}

interface Category {
  id: string;
  label: string;
  color: string;
  symptoms: Symptom[];
}

// ─── 変革手段マスタ ───────────────────────────────────────────────────────────

const TOOLS: Record<string, Tool> = {
  spot:     { name: 'スポットコンサル・インタビュー',       path: '/docs/変革マップ/知見・意思決定の変革/スポットコンサル・インタビュー' },
  research: { name: '市場調査・リサーチ',                   path: '/docs/変革マップ/知見・意思決定の変革/市場調査・リサーチ' },
  training: { name: '社内研修・リスキリング',               path: '/docs/変革マップ/人・能力の変革/社内研修・リスキリング' },
  ekkyou:   { name: '越境学習・経験付与',                   path: '/docs/変革マップ/人・能力の変革/越境学習・経験付与' },
  recruit:  { name: '人材登用（中途・新卒）',               path: '/docs/変革マップ/体制・人材の変革/人材登用（中途・新卒）' },
  freelance:{ name: '副業・フリーランス活用',               path: '/docs/変革マップ/体制・人材の変革/副業・フリーランス活用/概要' },
  advisor:  { name: '顧問・アドバイザリー',                 path: '/docs/変革マップ/体制・人材の変革/顧問・アドバイザリー' },
  project:  { name: 'プロジェクト型組織設計',               path: '/docs/変革マップ/体制・人材の変革/プロジェクト型組織設計' },
  talent:   { name: 'タレントマネジメント・社内人材の可視化', path: '/docs/変革マップ/体制・人材の変革/タレントマネジメント・社内人材の可視化' },
  tool:     { name: 'ツール導入（DX・SaaS）',               path: '/docs/変革マップ/実行・プロセスの変革/ツール導入（DX・SaaS）' },
  bpr:      { name: '業務改革（BPR）',                      path: '/docs/変革マップ/実行・プロセスの変革/業務改革（BPR）' },
  pmo:      { name: '実行支援・PMO',                        path: '/docs/変革マップ/実行・プロセスの変革/実行支援・PMO' },
  sales:    { name: '販路開拓支援・マッチング',             path: '/docs/変革マップ/販路・外部資本の変革/販路開拓支援・マッチング' },
  alliance: { name: '戦略的アライアンス',                   path: '/docs/変革マップ/販路・外部資本の変革/戦略的アライアンス' },
  manda:    { name: 'M&A・事業承継',                        path: '/docs/変革マップ/販路・外部資本の変革/M&A・事業承継' },
  ec:       { name: 'オンライン販路開拓（EC・D2C）',         path: '/docs/変革マップ/販路・外部資本の変革/オンライン販路開拓（EC・D2C）' },
  realec:   { name: 'リアル販路開拓（新規出店・FC展開）',    path: '/docs/変革マップ/販路・外部資本の変革/リアル販路開拓（新規出店・FC展開）' },
  subsidy:  { name: '補助金・助成金活用',                   path: '/docs/変革マップ/資金・財務の変革/補助金・助成金活用' },
  debt:     { name: 'デットファイナンス（融資）',            path: '/docs/変革マップ/資金・財務の変革/デットファイナンス（融資）' },
  equity:   { name: 'エクイティファイナンス（出資）',        path: '/docs/変革マップ/資金・財務の変革/エクイティファイナンス（出資）' },
  data:     { name: 'データ基盤整備',                       path: '/docs/変革マップ/データ・AI活用の変革/データ基盤整備' },
  ailiteracy:{ name: 'AIリテラシー・活用研修',              path: '/docs/変革マップ/データ・AI活用の変革/AIリテラシー・活用研修' },
  aipoc:    { name: 'AI活用推進（PoC・導入支援）',           path: '/docs/変革マップ/データ・AI活用の変革/AI活用推進' },
  aitalent: { name: 'データ・AI人材の活用',                 path: '/docs/変革マップ/データ・AI活用の変革/データ・AI人材の活用' },
};

// ─── 症状カテゴリ定義 ─────────────────────────────────────────────────────────

const CATEGORIES: Category[] = [
  {
    id: 'A',
    label: 'A. 意思決定・戦略',
    color: '#4361ee',
    symptoms: [
      { id: 'A-1', label: '会議をしても何も決まらない。承認が通らず施策が動かない', toolIds: ['spot', 'pmo', 'advisor'] },
      { id: 'A-2', label: '市場の動きが読めず方針が立てられない。競合が何をしているか分からない', toolIds: ['spot', 'research'] },
      { id: 'A-3', label: '経営が決めたことが現場に届かない。現場の声が経営に上がらない', toolIds: ['pmo', 'advisor'] },
      { id: 'A-4', label: 'アイデアは出るが承認されない。新規事業が育たずに終わる', toolIds: ['ekkyou', 'freelance', 'alliance'] },
      { id: 'A-5', label: '業界の変化に気づいたときにはもう遅い。デジタル化で他社に遅れている', toolIds: ['spot', 'research', 'ekkyou'] },
      { id: 'A-6', label: '「なんかうまくいっていない」感覚はあるが、何が問題か言語化できない', toolIds: ['spot', 'research', 'ekkyou', 'advisor', 'pmo'] },
    ],
  },
  {
    id: 'B',
    label: 'B. 人・組織文化',
    color: '#f72585',
    symptoms: [
      { id: 'B-1', label: '育てた人材がすぐ辞める。採用しても定着しない。そもそも応募が来ない', toolIds: ['recruit', 'training', 'advisor'] },
      { id: 'B-2', label: 'あの人がいないと仕事が回らない。退職のたびに知識が消える（属人化）', toolIds: ['bpr', 'tool', 'freelance'] },
      { id: 'B-3', label: 'DX・AIの波に社員がついていけない。研修はしているが変化を感じない', toolIds: ['training', 'ekkyou', 'freelance'] },
      { id: 'B-4', label: '「うちには無理」という声が出る。変革を推進する人が孤立する', toolIds: ['ekkyou', 'pmo', 'advisor'] },
      { id: 'B-5', label: 'プレイヤーとして優秀だがマネージャーになると機能しない。後継者がいない', toolIds: ['training', 'ekkyou', 'manda'] },
      { id: 'B-6', label: '頑張っている人が報われていない。評価基準が曖昧で納得感がない', toolIds: ['advisor', 'freelance'] },
      { id: 'B-7', label: '新規プロジェクトを立ち上げようとすると「誰がやるの？」で止まる', toolIds: ['project', 'pmo', 'freelance', 'bpr', 'advisor'] },
      { id: 'B-8', label: '社員の意欲・スキルが見えず埋もれている。静かな退職が広がっている', toolIds: ['talent', 'project', 'freelance', 'ekkyou', 'advisor'] },
    ],
  },
  {
    id: 'C',
    label: 'C. 実行力・オペレーション',
    color: '#7209b7',
    symptoms: [
      { id: 'C-1', label: '会議で決まったはずのことが動いていない。「あの件どうなった？」が繰り返される', toolIds: ['pmo', 'bpr', 'freelance'] },
      { id: 'C-2', label: '同じことを何度も入力している。承認フローが多すぎて時間がかかる', toolIds: ['bpr', 'tool', 'pmo'] },
      { id: 'C-3', label: 'ツールを導入したが使われていない。現場が「使いにくい」と戻ってしまう', toolIds: ['tool', 'freelance', 'training'] },
      { id: 'C-4', label: '部門をまたいだプロジェクトが進まない。情報が共有されず重複作業が起きている', toolIds: ['project', 'pmo', 'bpr', 'tool'] },
      { id: 'C-5', label: '「大丈夫」と言っていたのに直前でトラブルが発覚する。納期が守られない', toolIds: ['pmo', 'freelance'] },
      { id: 'C-6', label: 'やるべきことは分かっているが、日常業務で手一杯で変革に着手できない', toolIds: ['bpr', 'tool', 'pmo', 'freelance'] },
      { id: 'C-7', label: '特定の人だけが常に忙しく、キーパーソンが倒れたら業務が止まるリスクがある', toolIds: ['bpr', 'training', 'freelance', 'tool'] },
    ],
  },
  {
    id: 'D',
    label: 'D. 知見・情報',
    color: '#3a0ca3',
    symptoms: [
      { id: 'D-1', label: '業界トレンドへの感度が低く後追いになる。情報収集が個人の努力頼り', toolIds: ['research', 'spot', 'advisor'] },
      { id: 'D-2', label: '作ったものが売れない・使われない。顧客が何に困っているか言語化できない', toolIds: ['research', 'spot'] },
      { id: 'D-3', label: '法務・財務・IT・マーケなどの専門判断ができる人がいない', toolIds: ['spot', 'advisor', 'freelance'] },
      { id: 'D-4', label: 'データは溜まっているが意思決定に使えていない。分析ツールを誰も使いこなせない', toolIds: ['freelance', 'training', 'tool', 'data'] },
    ],
  },
  {
    id: 'E',
    label: 'E. 成長・外部連携',
    color: '#560bad',
    symptoms: [
      { id: 'E-1', label: '既存事業の成長が鈍化・横ばい。価格競争に巻き込まれ利益が出にくい', toolIds: ['sales', 'alliance', 'research'] },
      { id: 'E-2', label: '新しい業界・地域・顧客層に入れない。海外展開を検討しているが一歩が踏み出せない', toolIds: ['sales', 'alliance', 'advisor'] },
      { id: 'E-3', label: 'やりたいことはあるが人・金・知見が足りない。自社規模では対応できない案件がある', toolIds: ['freelance', 'alliance', 'manda'] },
      { id: 'E-4', label: '提携・アライアンスを組んだが成果が出ていない。パートナーとの温度差がある', toolIds: ['alliance', 'pmo'] },
      { id: 'E-5', label: '後継者問題がある。M&Aを検討しているがアプローチ方法が分からない', toolIds: ['manda', 'advisor', 'spot'] },
      { id: 'E-6', label: 'ECサイトを持っていない、または作ったが売れていない。SNSでの集客ができていない', toolIds: ['ec', 'freelance', 'data', 'research'] },
      { id: 'E-7', label: '地域展開・全国展開ができていない。フランチャイズ展開のオペレーションが標準化できない', toolIds: ['realec', 'alliance', 'bpr', 'subsidy', 'advisor'] },
    ],
  },
  {
    id: 'F',
    label: 'F. 資金・財務',
    color: '#06d6a0',
    symptoms: [
      { id: 'F-1', label: 'やりたいことはあるが軍資金がない。設備投資・採用・マーケへの投資ができない', toolIds: ['subsidy', 'debt', 'equity'] },
      { id: 'F-2', label: 'VCへのアプローチ方法が分からない。資本政策をどう設計すればいいか分からない', toolIds: ['equity', 'subsidy', 'advisor', 'spot'] },
      { id: 'F-3', label: '売上は立っているのにキャッシュが足りない。資金繰りが行き当たりばったり', toolIds: ['tool', 'advisor', 'bpr'] },
      { id: 'F-4', label: '財務戦略・CFO機能を担える人が社内にいない。財務数値を経営判断に使えていない', toolIds: ['freelance', 'advisor', 'recruit'] },
    ],
  },
  {
    id: 'G',
    label: 'G. データ・AI対応',
    color: '#118ab2',
    symptoms: [
      { id: 'G-1', label: 'データはあるがバラバラで使えない。顧客データ・業務データが意思決定に使われていない', toolIds: ['data', 'aipoc', 'tool', 'aitalent'] },
      { id: 'G-2', label: '一部の詳しい人だけがAIを使っていて組織全体に広がらない。管理職がAIを理解していない', toolIds: ['ailiteracy', 'training', 'ekkyou', 'freelance'] },
      { id: 'G-3', label: 'AIが自社のビジネスにどう影響するか分からない。何から始めればいいか分からない', toolIds: ['spot', 'aitalent', 'research', 'advisor'] },
      { id: 'G-4', label: 'AI活用で生産性が上がらず、変革リソースを生み出せていない。ルーティン業務が自動化されていない', toolIds: ['aipoc', 'bpr', 'ailiteracy', 'pmo'] },
    ],
  },
];

// ─── ロジック ─────────────────────────────────────────────────────────────────

function calcRecommendations(checked: Set<string>): { toolId: string; count: number }[] {
  const counts: Record<string, number> = {};
  for (const category of CATEGORIES) {
    for (const symptom of category.symptoms) {
      if (checked.has(symptom.id)) {
        for (const toolId of symptom.toolIds) {
          counts[toolId] = (counts[toolId] ?? 0) + 1;
        }
      }
    }
  }
  return Object.entries(counts)
    .map(([toolId, count]) => ({ toolId, count }))
    .sort((a, b) => b.count - a.count);
}

// ─── コンポーネント ───────────────────────────────────────────────────────────

const STORAGE_KEY = 'henkaku-checklist-v1';

export default function ChecklistPage(): ReactNode {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [mounted, setMounted] = useState(false);

  // localStorage の読み込み（SSR を避けるため useEffect 内で）
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setChecked(new Set(JSON.parse(saved) as string[]));
      }
    } catch {
      // ignore
    }
    setMounted(true);
  }, []);

  // localStorage への書き込み
  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...checked]));
    } catch {
      // ignore
    }
  }, [checked, mounted]);

  const toggle = (id: string) => {
    setChecked(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const clearAll = () => setChecked(new Set());

  const recommendations = calcRecommendations(checked);
  const topRecs = recommendations.slice(0, 8);
  const totalChecked = checked.size;

  return (
    <Layout
      title="症状チェックリスト"
      description="自社に当てはまる症状にチェックを入れると、推奨される変革手段が表示されます">
      <main style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1rem' }}>

        {/* ヘッダー */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>症状チェックリスト</h1>
          <p style={{ color: '#666', marginBottom: '1rem' }}>
            自社に当てはまる症状にチェックを入れてください。チェックした内容をもとに、優先度の高い変革手段を自動で提案します。<br />
            <small>※ チェック状態はブラウザに保存されます。</small>
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <span style={{
              background: '#4361ee',
              color: '#fff',
              borderRadius: 20,
              padding: '4px 14px',
              fontWeight: 700,
              fontSize: '0.9rem',
            }}>
              {totalChecked} 件チェック済み
            </span>
            {totalChecked > 0 && (
              <button
                onClick={clearAll}
                style={{
                  background: 'none',
                  border: '1px solid #ccc',
                  borderRadius: 20,
                  padding: '4px 14px',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  color: '#666',
                }}>
                すべてクリア
              </button>
            )}
          </div>
        </div>

        {/* 症状リスト */}
        {CATEGORIES.map(cat => (
          <section key={cat.id} style={{ marginBottom: '2rem' }}>
            <h2 style={{
              fontSize: '1.1rem',
              fontWeight: 700,
              borderLeft: `4px solid ${cat.color}`,
              paddingLeft: '0.75rem',
              marginBottom: '0.75rem',
              color: cat.color,
            }}>
              {cat.label}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {cat.symptoms.map(symptom => {
                const isChecked = checked.has(symptom.id);
                return (
                  <label
                    key={symptom.id}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                      padding: '0.6rem 0.9rem',
                      borderRadius: 8,
                      cursor: 'pointer',
                      background: isChecked ? `${cat.color}18` : '#f8f8f8',
                      border: `1.5px solid ${isChecked ? cat.color : 'transparent'}`,
                      transition: 'all 0.15s ease',
                    }}>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggle(symptom.id)}
                      style={{ marginTop: 3, accentColor: cat.color, width: 16, height: 16, flexShrink: 0 }}
                    />
                    <span style={{ fontSize: '0.9rem', lineHeight: 1.5 }}>
                      <span style={{
                        fontWeight: 700,
                        color: cat.color,
                        marginRight: '0.4rem',
                        fontSize: '0.8rem',
                      }}>
                        {symptom.id}
                      </span>
                      {symptom.label}
                    </span>
                  </label>
                );
              })}
            </div>
          </section>
        ))}

        {/* 推奨変革手段 */}
        <section style={{
          position: 'sticky',
          bottom: 0,
          background: '#fff',
          borderTop: '2px solid #e0e0e0',
          paddingTop: '1.5rem',
          marginTop: '2rem',
        }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>
            推奨される変革手段
          </h2>
          {totalChecked === 0 ? (
            <p style={{ color: '#999', fontSize: '0.9rem' }}>
              症状にチェックを入れると、ここに推奨される変革手段が表示されます。
            </p>
          ) : (
            <>
              <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '1rem' }}>
                チェックした {totalChecked} 件の症状に最も多く関連する変革手段です。
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                {topRecs.map(({ toolId, count }) => {
                  const tool = TOOLS[toolId];
                  if (!tool) return null;
                  const intensity = Math.min(count / Math.max(topRecs[0]?.count ?? 1, 1), 1);
                  const bg = `rgba(67,97,238,${0.1 + intensity * 0.25})`;
                  return (
                    <Link
                      key={toolId}
                      to={tool.path}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        padding: '0.4rem 0.9rem',
                        borderRadius: 20,
                        background: bg,
                        border: '1.5px solid #4361ee44',
                        textDecoration: 'none',
                        color: '#1a1a2e',
                        fontSize: '0.88rem',
                        fontWeight: count >= (topRecs[0]?.count ?? 0) ? 700 : 400,
                      }}>
                      <span style={{
                        background: '#4361ee',
                        color: '#fff',
                        borderRadius: 10,
                        padding: '1px 7px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                      }}>
                        {count}
                      </span>
                      {tool.name}
                    </Link>
                  );
                })}
              </div>
              <Link
                to="/docs/変革マップ/概要"
                style={{ fontSize: '0.85rem', color: '#4361ee' }}>
                変革手段の全一覧を見る →
              </Link>
            </>
          )}
        </section>

      </main>
    </Layout>
  );
}
