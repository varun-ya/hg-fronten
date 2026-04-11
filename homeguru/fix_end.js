const fs = require('fs');
const f = 'c:\\Users\\varun\\OneDrive\\Documents\\hgstudent\\homeguru\\components\\tutor-onboarding\\AdminStep4QualificationTest.tsx';
let c = fs.readFileSync(f, 'utf8');

// Fix 1: Add return null before closing brace
c = c.replace(
  '  // Shared camera PiP - shown during MCQ and Written tests\n\n\n}',
  '  // Shared camera PiP - shown during MCQ and Written tests\n\n  return null;\n}'
);

// Fix 2: Check if PipCamera is in MCQ portal, if not add it
const mcqHasPip = c.includes('<PipCamera />');
console.log('PipCamera found:', mcqHasPip);
console.log('PipCamera def found:', c.includes('const PipCamera'));

fs.writeFileSync(f, c, 'utf8');
console.log('Done');
