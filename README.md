# Node.js Note-Taking CLI

To create a CLI, place the code below in `package.json`. The `nt` key can be anything but the key must be within the `bin` object. The value needs to be the main file which will run the script. 

```js
{
  "bin": {
    "nt": "./index.js"
  }
}
```

The main file `./index.js` must contain a hashbang for it to know that it's a Node.js script.

```js
#!/usr/bin/env node
```

Then, in the root directory, open a terminal windows and enter `npm link` to create a symbolic link from the global npm directory to your local development directory (the root of this project)

Once it's linked, when you run the `nt` command in the project, it'll execute the `./index.js` file.