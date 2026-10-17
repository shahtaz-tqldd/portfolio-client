export type Lang = "python" | "sql" | "tsx" | "bash" | "text";

const KEYWORDS: Record<Lang, string[]> = {
  python: [
    "def", "class", "return", "import", "from", "as", "if", "else", "elif", "for", "while",
    "try", "except", "with", "not", "in", "and", "or", "None", "True", "False", "async",
    "await", "lambda", "raise", "yield", "pass", "self", "set", "sum",
  ],
  sql: [
    "SELECT", "FROM", "WHERE", "JOIN", "LEFT", "INNER", "ON", "GROUP BY", "ORDER BY",
    "LIMIT", "INSERT", "INTO", "VALUES", "UPDATE", "SET", "DELETE", "CREATE", "INDEX",
    "TABLE", "PRIMARY", "KEY", "REFERENCES", "NOT", "NULL", "USING", "WITH", "AS",
    "ENUM", "UUID", "TEXT", "BOOLEAN", "TIMESTAMPTZ", "NUMERIC", "CONFLICT", "DO",
    "NOTHING", "AND", "IS", "ASC", "DESC",
  ],
  tsx: [
    "import", "from", "export", "const", "let", "var", "function", "return", "if", "else",
    "for", "while", "new", "class", "extends", "interface", "type", "async", "await",
    "null", "undefined", "true", "false", "as", "of", "in",
  ],
  bash: ["cd", "export", "run", "docker", "npm", "pip", "python", "curl", "echo"],
  text: [],
};

export interface Token {
  t: string;
  c: "comment" | "string" | "keyword" | "number" | "plain";
}

/** Tiny dependency-free tokenizer good enough for display code blocks. */
export function tokenize(code: string, lang: Lang): Token[] {
  const kws = KEYWORDS[lang] ?? [];
  const commentSource = lang === "python" || lang === "bash" ? "#[^\\n]*" : lang === "sql" ? "--[^\\n]*" : "//[^\\n]*";
  const stringSource = "'(?:\\\\.|[^'\\\\])*'|\"(?:\\\\.|[^\"\\\\])*\"|`(?:\\\\.|[^`\\\\])*`";
  const kwSource = kws.length ? `\\b(?:${kws.map((k) => k.replace(/ /g, "\\s+")).join("|")})\\b` : "(?!)";
  const numberSource = "\\b\\d[\\d._]*\\b";
  const flags = lang === "sql" ? "gi" : "g";
  const re = new RegExp(`(${commentSource})|(${stringSource})|(${kwSource})|(${numberSource})`, flags);

  const tokens: Token[] = [];
  let last = 0;
  for (const m of code.matchAll(re)) {
    const idx = m.index ?? 0;
    if (idx > last) tokens.push({ t: code.slice(last, idx), c: "plain" });
    const cls = m[1] ? "comment" : m[2] ? "string" : m[3] ? "keyword" : "number";
    tokens.push({ t: m[0], c: cls });
    last = idx + m[0].length;
  }
  if (last < code.length) tokens.push({ t: code.slice(last), c: "plain" });
  return tokens;
}
