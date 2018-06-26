 #!/usr/bin/bash 

function dependency_alert {
  # $1 dependency name
  # $2 current version
  # $3 version should be

  echo "This project has dependency on $1 ..."
  echo "Your current version of $1 is $2"
  echo "Please install $1 version high then $3"
}

if which node > /dev/null
then
  node_version=$(node --version)

  declare -i node_version=$(echo ${node_version:1:6} | awk -F "." '{ print $1 }')

  if which npm > /dev/null
  then
    npm_version=$(npm --version)

    if (( $node_version >= 10 ))
    then
      echo "Node version is correct"
      npm i
      cd public/hackathon
      npm i
      npm run build
      cd -
      echo "Setup has successfully finished..."
      echo "For running server in development environment run - 'npm run start-dev'"
      echo "For running server with hackathon client in development environment run - 'npm run start-dev-with-hackathon-client'"
      echo "For running project in production environment run - 'npm run start-hackathon-prod' (or by using any process manager like pm2)"
    else
      dependency_alert "nodejs" $node_version 10
    fi
  else
    dependency_alert "npm" $npm_version 6
  fi
else
    echo "Nodejs is not installed..."
    echo "This project has dependency on Nodejs..."
fi
