Jet Example App

Basic example execution:

1) Install javascript dependencies: in Jet main directory `yarn && yarn example:install`
1) Install pods: in example directory `rm -f ios/Podfile.lock macos/Podfile.lock && cd ios && pod install cd ../macos/ && pod install && cd ..`
1) `yarn jet --target=<platform>`, use ios, macos, or android for platform
