import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './../store/appStore.js';

const childPage = (ChildPage) => {
    return (
        class Page extends React.Component {
            render() {
                return (
                    <Provider store={configureStore()}>
                        <div>
                            <ChildPage />
                        </div>
                    </Provider>
                )
            }
        }
    )
}

export default childPage;
