# form

フォームを作成するためのDSL

## development

JSON Type Definitionからcodegenするためのツールをインストール

```
$ yarn install-codegen:mac
```

./schemasのJSON Type Definitionからsrc/schemaをビルド

```
$ yarn codegen
```

typescriptをトランスパイル

```
$ # yarn clean
$ yarn build
```

