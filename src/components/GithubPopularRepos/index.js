import {Component} from 'react'
import './index.css'
import Loader from 'react-loader-spinner'
import RepositoryItem from '../RepositoryItem'
import LanguageFilterItem from '../LanguageFilterItem'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]
const ConstraintsStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',

  failure: 'FAILURE',
  loading: 'LOADING',
}

class GithubPopularRepos extends Component {
  state = {
    language: languageFiltersData[0].id,
    listOfLanguage: [],
    status: ConstraintsStatus.initial,
  }

  componentDidMount() {
    this.listItems()
  }

  //   onSubmitSuccess = languageData => {
  //     console.log(languageData)
  //   }
  updatedLanguage = id => {
    this.setState({language: id}, this.listItems)
  }

  listItems = async () => {
    const {language} = this.state
    this.setState({status: ConstraintsStatus.loading})
    const url = `https://apis.ccbp.in/popular-repos?language=${language}`
    const response = await fetch(url)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = data.popular_repos.map(each => ({
        name: each.name,
        id: each.id,
        issuesCount: each.issues_count,
        forksCount: each.forks_count,
        starsCount: each.stars_count,
        avatarUrl: each.avatar_url,
      }))
      this.setState({
        listOfLanguage: updatedData,
        status: ConstraintsStatus.success,
      })
    } else {
      console.log(response)
      this.setState({status: ConstraintsStatus.failure})
    }
  }

  successList = () => {
    const {listOfLanguage, language} = this.state
    return (
      <ul className="ulel">
        {listOfLanguage.map(each1 => (
          <RepositoryItem each1={each1} key={each1.id} />
        ))}
      </ul>
    )
  }

  failureList = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1>Something Went Wrong</h1>
    </div>
  )

  loadingList = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderList = () => {
    const {status} = this.state
    switch (status) {
      case 'SUCCESS':
        return this.successList()
      case 'FAILURE':
        return this.failureList()
      case 'LOADING':
        return this.loadingList()
      default:
        return null
    }
  }

  render() {
    const {language} = this.state
    return (
      <div className="bg-color">
        <h1 className="heading">Popular</h1>
        <ul className="ul">
          {languageFiltersData.map(each => (
            <LanguageFilterItem
              each={each}
              key={each.id}
              updatedLanguage={this.updatedLanguage}
              isClicked={each.id === language}
            />
          ))}
        </ul>
        {this.renderList()}
      </div>
    )
  }
}
export default GithubPopularRepos
