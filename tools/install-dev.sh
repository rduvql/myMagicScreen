#! /bin/bash

if [ ! -d "$HOME/bin" ]; then
    mkdir "$HOME/bin"
    PATH=$PATH:$HOME/bin
fi

wget -qO- "https://github.com/koalaman/shellcheck/releases/download/latest/shellcheck-latest.linux.x86_64.tar.xz" | tar -xJv
cp shellcheck-latest/shellcheck "$HOME/bin/shellcheck"
rm -rf shellcheck-latest/

wget "https://github.com/hadolint/hadolint/releases/download/v2.8.0/hadolint-Linux-x86_64" -O "$HOME/bin/hadolint"
chmod +x $HOME/bin/*
