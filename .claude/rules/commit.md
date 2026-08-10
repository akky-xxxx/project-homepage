# コミットルール

- [Semantic commit messages](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716) に則る
  - feat: (new feature for the user, not a new feature for build script)
  - fix: (bug fix for the user, not a fix to a build script)
  - docs: (changes to the documentation)
  - style: (formatting, missing semi colons, etc; no production code change)
  - refactor: (refactoring production code, eg. renaming a variable)
  - test: (adding missing tests, refactoring tests; no production code change)
  - chore: (updating grunt tasks etc; no production code change)
- cherry-pick や drop 等、コミット単位の操作をしやすい粒度
  - 実装における1機能以下
- commit を実行する前に、staged される内容(diff)と commit message を提示し、ユーザーから明示的な承認を得てから `git commit` を実行する
  - 自分(agent)だけで内容を確認して進めるのは不可。必ずユーザーの承認を待つ
  - 複数コミットに分ける場合は、コミットごとに承認を得る
