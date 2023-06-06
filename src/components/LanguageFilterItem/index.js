import './index.css'

const LanguageFilterItem = props => {
  const {each, updatedLanguage, isClicked} = props
  const {id, language} = each
  const clickedButton = isClicked ? 'clicked-button' : 'button'
  console.log(isClicked)
  return (
    <button
      type="button"
      className={clickedButton}
      onClick={() => updatedLanguage(id)}
    >
      {language}
    </button>
  )
}
export default LanguageFilterItem
