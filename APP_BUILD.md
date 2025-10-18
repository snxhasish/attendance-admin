# Steps to build app for testing

## Expo prebuild - creates `/android` and `/expo`

```bash
pnpx expo prebuild
```

## git commit and push

## expo login incase u haven't

```bash
pnpx expo login
```

## preview build

```bash
pnpx eas build -p android --profile preview
```

## a qr / link will be generated, visit it from phone and download the .apk artifact and install it.
