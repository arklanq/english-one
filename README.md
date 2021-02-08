# English One

`React Native` | `Expo` | `TypeScript` | `React Native Paper`

### Instalacja projektu

> Wymagny zaintalowany Node.JS w wersji 14

> Jeśli jeszcze nie mamy zainstalowanego `Yarn'a` należy zainstalować go poleceniem
> `npm install -g yarn`

1. `yarn install`
2. `yarn global add expo-cli`

### Uruchomienie projektu

> Możliwe iż wymagane będzie zalogowanie się na własne konto Expo. W tym celu rejestrujemy się pod adresem
> `https://expo.io/`, a następnie logujemy się komendą `expo-cli login`

1. `yarn start`

### Budowa binarek .APK

> (Zaleca się budowanie binarek testowych na kanale innym niż produkcyjny: stąd `--release-channel dev`)

`expo build:android -t apk --release-channel dev`
