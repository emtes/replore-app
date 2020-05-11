import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import ExploreRepositories from './components/ExploreRepositories';
import RepoSearchForm from './components/RepoSearchForm';
import RepoCard from './components/RepoCard';

describe('Components render child components', () => {
  test('ExploreRepositories renders RepoSearchForm', () => {
    const { getByText } = render(<ExploreRepositories />);
    const keywordInput = getByText('Keywords');
    const languageInput = getByText('Language');
    const sortInput = getByText('Sort By Dates');
    expect(keywordInput).toBeTruthy();
    expect(languageInput).toBeTruthy();
    expect(sortInput).toBeTruthy();
  });

  test('App renders Landing', () => {
    const { getByText } = render(<App />);
    const discoverFeature = getByText('Discover');
    const contributeFeature = getByText('Contribute');
    const learnFeature = getByText('Learn');
    expect(discoverFeature).toBeTruthy();
    expect(contributeFeature).toBeTruthy();
    expect(learnFeature).toBeTruthy();
  });
});
