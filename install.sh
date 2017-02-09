# Frecl lolz
printf "\n\n";
printf "  ______             _  \n";
printf " |  ____|           | | \n";
printf " | |__ _ __ ___  ___| | \n";
printf " |  __| '__/ _ \/ __| | \n";
printf " | |  | | |  __/ (__| | \n";
printf " |_|  |_|  \___|\___|_| \n";

#Begin
read -rsp $'\n\nBeginning Frecl install, press any key to continue...\n\n\n' -n1 key

# Check for Homebrew and install
if ! which brew >/dev/null; then
    printf "\n\nInstalling Homebrew . . .\n\n"
    ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
else

    printf "\n\nHomebrew installed, updated and upgrading . . .\n\n"
fi

brew doctor
brew update
brew upgrade

# Check for Node and install
if ! which node >/dev/null; then
    printf "\n\nInstalling Node.js . . .\n\n"
    brew install node
else
    printf "\n\nNode installed, skipping . . .\n\n"
fi

printf "\n\nInstalling required global Node.js modules . . .\n\n"
if ! which bower >/dev/null; then
    npm install -g bower
fi

if ! which webpack >/dev/null; then
    npm install -g webpack
fi

printf "\n\nRunning NPM Install . . .\n\n"
npm install
