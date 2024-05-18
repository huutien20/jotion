const { useContext } = require('react');
const { ThemeContext } = require('~/providers/ThemeProvider');

const useTheme = () => useContext(ThemeContext);

export default useTheme;
