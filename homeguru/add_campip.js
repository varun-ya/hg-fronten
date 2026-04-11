const fs = require('fs');
const f = 'c:\\Users\\varun\\OneDrive\\Documents\\hgstudent\\homeguru\\components\\tutor-onboarding\\AdminStep4QualificationTest.tsx';
let c = fs.readFileSync(f, 'utf8');

// Find the MCQ portal closing — add CamPiP before </div>, document.body
// MCQ portal ends with the bottom nav closing, then </div></div></div>
// We look for the unique string right before document.body in MCQ section
const mcqPortalEnd = `        </div>\n      </div>,\n      document.body\n    );\n  }\n  if (sub === 0)`;
const mcqPortalEndNew = `        </div>\n        <CamPiP />\n      </div>,\n      document.body\n    );\n  }\n  if (sub === 0)`;

if (c.includes(mcqPortalEnd)) {
  c = c.replace(mcqPortalEnd, mcqPortalEndNew);
  console.log('MCQ CamPiP added');
} else {
  console.log('MCQ end NOT found');
}

// Find the Written portal closing — add CamPiP before </div>, document.body
const writPortalEnd = `        </div>\n      </div>,\n      document.body\n    );\n  }\n\n  return null`;
const writPortalEndNew = `        </div>\n        <CamPiP />\n      </div>,\n      document.body\n    );\n  }\n\n  return null`;

if (c.includes(writPortalEnd)) {
  c = c.replace(writPortalEnd, writPortalEndNew);
  console.log('Written CamPiP added');
} else {
  console.log('Written end NOT found');
}

fs.writeFileSync(f, c, 'utf8');
