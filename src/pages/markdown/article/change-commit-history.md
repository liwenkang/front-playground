## change-commit-history

1.  change last commit message

```
git commit --amend -m "right commit"
```

2. change history commit message

```
git rebase -i HEAD~2
```

```
pick 8675a9d add fle2
pick 903c238 add file1
=>
reword 8675a9d fle2
pick 903c238 add file1
```

then, you can replace `fle2` to other words
