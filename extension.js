// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require('vscode');
var fmt = require('coffee-fmt');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    var disposable = vscode.commands.registerCommand('extension.format', function () {
        const config = vscode.workspace.getConfiguration('coffescriptFormatter');
        
        if (config.enable) {
            const editor = vscode.window.activeTextEditor;
            if (!editor || !editor.document) return;
            const doc = editor.document;

            try {
                let coffee = fmt.format(editor.document.getText(), { tab: '\t', newLine: '\n' });

                editor.edit(editorEdit => {
                    const start = new vscode.Position(0, 0);
                    const end = new vscode.Position(doc.lineCount - 1, doc.lineAt(doc.lineCount - 1).text.length);
                    const range = new vscode.Range(start, end)
                    return editorEdit.replace(range, coffee)
                })
            } catch(err) {
                vscode.window.showErrorMessage(err);
            }
        }
    });

    context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;