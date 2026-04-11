const fs = require('fs');
const glob = require('glob');

const files = glob.sync('app/**/*.tsx');

let changedAny = false;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Convert standard buttons inside TSX files to rounded-full
  let updated = content.replace(/(<button[^>]*className=["'\`][^"'\`]*?)rounded-lg([^"'\`]*?["'\`])/g, '$1rounded-full$2');
  updated = updated.replace(/(<button[^>]*className=["'\`][^"'\`]*?)rounded-xl([^"'\`]*?["'\`])/g, '$1rounded-full$2');

  if (updated !== content) {
    fs.writeFileSync(file, updated, 'utf8');
    console.log(`Updated buttons in ${file}`);
    changedAny = true;
  }
});

if (!changedAny) {
  console.log('No buttons found to update.');
}
