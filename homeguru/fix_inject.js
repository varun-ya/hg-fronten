const fs = require('fs');
const f = 'c:\\Users\\varun\\OneDrive\\Documents\\hgstudent\\homeguru\\components\\tutor-onboarding\\AdminStep4QualificationTest.tsx';
let c = fs.readFileSync(f, 'utf8');

// 1. Fix function signature to have explicit return type
c = c.replace(
  'export default function AdminStep4QualificationTest({ subjects = [], onNext, onBack }: Props) {',
  'export default function AdminStep4QualificationTest({ subjects = [], onNext, onBack }: Props): React.ReactNode {'
);

// 2. Find MCQ portal end and inject PipCamera
// MCQ portal: find "document.body\n    );\n  }\n" followed by "if (sub === 0)"
const mcqEnd = c.indexOf("document.body\n    );\n  }\n\n\n  if (sub === 0)");
if (mcqEnd !== -1) {
  const insertAt = c.indexOf('\n      </div>,\n      document.body\n    );\n  }\n\n\n  if (sub === 0)');
  c = c.substring(0, insertAt) + '\n        <PipCamera />' + c.substring(insertAt);
  console.log('MCQ PipCamera injected');
} else {
  console.log('MCQ end not found');
}

// 3. Find Written portal end and inject PipCamera
// Written portal ends just before "return null"
const writEnd = c.indexOf('\n      </div>,\n      document.body\n    );\n  }\n\n  return null;');
if (writEnd !== -1) {
  c = c.substring(0, writEnd) + '\n        <PipCamera />' + c.substring(writEnd);
  console.log('Written PipCamera injected');
} else {
  // try alternate ending
  const writEnd2 = c.lastIndexOf('\n      </div>,\n      document.body\n    );\n  }');
  if (writEnd2 !== -1) {
    c = c.substring(0, writEnd2) + '\n        <PipCamera />' + c.substring(writEnd2);
    console.log('Written PipCamera injected (alt)');
  } else {
    console.log('Written end not found');
  }
}

fs.writeFileSync(f, c, 'utf8');
console.log('Done');
