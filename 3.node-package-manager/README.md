## Node Package Manager (npm)

 npm is installed along with Node.js. To check if npm is installed, run the following command in your terminal:
```
npm -v
```
### Basic Usage
npm allows you to install, update, and manage packages (dependencies) for your Node.js projects. Here are some fundamental concepts:

- Package: A package is a collection of files that implements a specific functionality. It can be distributed and shared with others.
- Module: A module is a file or directory in the node_modules directory that has a package.json file. It can be a package itself or a dependency of a package.
- Dependency: A dependency is a package that another package relies on to function correctly

### Common Commands
Here are some of the most commonly used npm commands:

- Initialize a new project: Start a new Node.js project and create a package.json file.
```
npm init
```
You can use `npm init -y` to skip the prompts and accept the default values.

- Install a package: Install a package and save it as a dependency in your package.json file.
```
npm install <package-name>
```
Use `--save-dev` to install a package as a development dependency.

- Run a script: Execute a script defined in your package.json file.
```
npm run <script-name>
```
- Update a package: Update a package to the latest version.
```
npm update <package-name>
```
- Uninstall a package: Remove a package from your project.
```
npm uninstall <package-name>
```
- List installed packages: View all installed packages in your project.
```
npm list
```
- View package information: Get information about a specific package.
```
npm view <package-name>
```
- Cache clean: Clear the npm cache.
```
npm cache clean --force
```
- Install global packages: Install a package globally so it can be used from any directory.
```
npm install -g <package-name>
```