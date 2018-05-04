# esca-scripts

Reusable CLI scripts for devops.

## Installation

Local:

```bash
yarn add esca-scripts
```

Or global:

```bash
yarn global add esca-scripts
```

## Usage

```bash
esca-scripts <command>
```

### build

Build distributable files

Option | Description | Default
--- | --- | ---
`--src` | The source directory of your project | `"src"`
`--dist` | The distribution directory your project will compile to | `"dist"`

### bundle

Build distributable bundle file for browser

Option | Description | Default
--- | --- | ---
`--src` | The source file of your project | `"dev/index.html"`
`--dist` | The distribution file/directory your project will compile to | `"dist-dev/index.html"`

### dev

Live develop in browser

Option | Description | Default
--- | --- | ---
`--src` | The source file of your project | `"dev/index.html"`
`--dist` | The distribution file/directory your project will compile to | `"dist-dev/index.html"`

### rename

Renames project files

Option | Description | Default
--- | --- | ---
`--name` | The new name | (Working directory name)

### reset

Resets and renames project

Option | Description | Default
--- | --- | ---
`--name` | The new name | (Working directory name)

### run

Run a file in Node.js

Option | Description | Default
--- | --- | ---
`--file` | The file to run | `"./src/index"`

### serve

Serve a directory of static files

Option | Description | Default
--- | --- | ---
`--dir` | The directory to serve | `"dist"`
`--no-open` | Prevents browser from opening | (Off)

### test

Runs tests