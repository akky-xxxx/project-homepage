# common

- yagni を意識する
  - ただし、ツールの暗黙の既定挙動に依存して設定を省かない。重複に見えても意図が読み取れるよう明示する(例: gitignore 済みのパスは prettier / editorconfig-checker も自動で除外されるが、`.prettierignore` / `.ecrc` にも明示する)
- dry を意識する
- early return を意識する
- 型安全を意識する
- testable を意識する
- 順序に意味を持たない array, object, リスト(.gitignore, .prettierignore 等)は alphabetical order にする
  - 順序に意味がある場合(否定パターンの前後関係、マージ時の上書き優先順位など)は対象外
  - コメント等で意図的にグルーピングされている場合はグループ単位を保ったまま、グループ内で alphabetical order にする
