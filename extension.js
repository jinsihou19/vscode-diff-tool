// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const Uri = vscode.Uri;
let cache = {};

const EXTENSION_NAMESPACE = 'extension.diffTool';
const cb = (textEditor) => {
    if (!cache.left) {
        cache.left = textEditor.document.uri;
        return;
    }
    if (!cache.right) {
        cache.right = textEditor.document.uri;
    }
    if (cache.left && cache.right) {
        vscode.commands.executeCommand('vscode.diff', cache.left, cache.right, 'diff');
        cache = {};
    }
}

const registerMenuActions = (context) => {
    const commandMap = new Map([
        [`${EXTENSION_NAMESPACE}.diffToolLeft`, cb],
        [`${EXTENSION_NAMESPACE}.diffToolRight`, cb]
    ]);
    commandMap.forEach((command, commandName) => {
        const disposable = vscode.commands.registerTextEditorCommand(commandName, command);
        context.subscriptions.push(disposable);
    });
}

const registerCommand = (context) => {
    var disposable = vscode.commands.registerCommand(EXTENSION_NAMESPACE, function () {
        vscode.window.showInformationMessage("插件可以正常运行。");
    });
    context.subscriptions.push(disposable);
}

exports.activate = (context) => {
    registerMenuActions(context);
    registerCommand(context);
};

exports.deactivate = ()=> {};