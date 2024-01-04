FILE_CONTENT=$(cat $HOME/.bashrc | grep 'alias bionicrd="node $HOME/bionic-reader-js/app.js"')

if test "$FILE_CONTENT" = 'alias bionicrd="node $HOME/bionic-reader-js/app.js"'; then
    echo "Already installed."
    exit 0
fi

mkdir $HOME/bionic-reader-js
cp -r ../bionic-reader-js/app.js ../bionic-reader-js/package.json $HOME/bionic-reader-js
echo 'alias bionicrd="node $HOME/bionic-reader-js/app.js"' >> $HOME/.bashrc
echo 'Instalation successful.
Re-open terminal or run "source $HOME/.bashrc".
Then type "bionicrd --help".'

# PROJECT_PATH=$HOME/bionic-reader-js
# if test -d "$PROJECT_PATH"; then
#     echo "$PROJECT_PATH exists."
#     exit 1
# else
#     echo "$PROJECT_PATH does not exists."
# fi

# test -d "$PROJECT_PATH" && echo "$PROJECT_PATH exists." || echo "$PROJECT_PATH does not exists."
