// Test the getNativeScriptLanguage function
const getNativeScriptLanguage = (personName, ethnicity) => {
  if (personName === 'Afreen Mirza') return 'اردو';
  if (personName === 'Safeena Farooqui') return 'اردو';
  if (personName === 'Tajik') return 'Тоҷикӣ';
  return 'Test Script';
};

console.log('Test 1:', getNativeScriptLanguage('Afreen Mirza', 'Pakistani'));
console.log('Test 2:', getNativeScriptLanguage('Safeena Farooqui', 'Indian'));
console.log('Test 3:', getNativeScriptLanguage('Tajik', 'Tajik'));
