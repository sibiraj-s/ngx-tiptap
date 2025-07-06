import fs from 'node:fs/promises';
import path from 'node:path';
import color from 'picocolors';

const copyFile = async function (srcFilePath, destFilePath) {
  const fileName = path.basename(srcFilePath);
  try {
    const srcPath = path.resolve(process.cwd(), srcFilePath);
    const destPath = path.resolve(process.cwd(), 'dist/ngx-tiptap', destFilePath);
    await fs.copyFile(srcPath, destPath);
    console.log(color.green(`- File Copied: ${fileName}`));
  } catch (err) {
    console.log(color.red(`Error while copying ${fileName}`), err);
  }
};

copyFile('README.md', 'README.md');
copyFile('LICENSE', 'LICENSE');
copyFile('CHANGELOG.md', 'CHANGELOG.md');
