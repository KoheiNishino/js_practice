import { fileURLToPath } from 'url'
import { strictEqual } from "assert";
import { readFileSync } from "fs";
import { dirname, resolve } from "path";
import md2html from "../md2html.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

it("converts Markdown to HTML (GFM=false)", () => {
    // fs.readFileSyncは同期的にファイルを読み込むメソッド
    const sample = readFileSync(resolve(__dirname, "./fixtures/sample.md"), { encoding: "utf8" });
    const expected = readFileSync(resolve(__dirname, "./fixtures/expected.html"), { encoding: "utf8" });
    // 末尾の改行の有無の違いを無視するため、変換後のHTMLのスペースをtrimメソッドで削除してから比較しています
    strictEqual(md2html(sample, { gfm: false }).trimEnd(), expected.trimEnd());
});

it("converts Markdown to HTML (GFM=true)", () => {
    const sample = readFileSync(resolve(__dirname, "./fixtures/sample.md"), { encoding: "utf8" });
    const expected = readFileSync(resolve(__dirname, "./fixtures/expected-gfm.html"), { encoding: "utf8" });
    // 末尾の改行の有無の違いを無視するため、変換後のHTMLのスペースをtrimメソッドで削除してから比較しています
    strictEqual(md2html(sample, { gfm: true }).trimEnd(), expected.trimEnd());
});
