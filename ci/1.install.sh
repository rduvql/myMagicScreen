#! /usr/bin/bash

requirementOk=1

checkInstalled() {
    if [ -z "$(which $1)" ]; then
        echo "$1 not installed on this runner's host";
        requirementOk=0
    fi
}

checkInstalled yarn
checkInstalled node
checkInstalled npm
checkInstalled git

[[ requirementOk -eq 0 ]] && exit 1

# cache check
if [[ -f "/tmp/runner-cache/$DRONE_COMMIT_BRANCH.tar" ]]; then
    echo "+ tar -xf /tmp/.drone-cache/$DRONE_COMMIT_BRANCH.tar -C ."
    tar -xf "/tmp/.drone-cache/$DRONE_COMMIT_BRANCH.tar" -C .
fi

echo "+ npm install"
npm install

exit 0








# advanced caching

# starting_sha=$(git rev-list $(git branch --show-current) | tail -n1)
# last_sha=$(git rev-list $(git branch --show-current) -n1)

# tar_file=$(ls /tmp/.drone-cache/$branch-*.tar)

# echo ${name#"$branch-"}

# if [ -f $tar_file ]; then
#     starting_sha=$(basename $tar_file .tar)
# fi

# # package-lock changed
# if [ $(git log --name-only --pretty=oneline --full-index $starting_sha..$last_sha | grep package-lock.json | wc -l ) -gt 0 ]; then
#     yarn install
#     # todo cache
# else
#     tar -xf /tmp/.drone-cache/$tar_file -C .
# fi