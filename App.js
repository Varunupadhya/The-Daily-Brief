import React, { Component } from 'react';
import NavBar from './comp/NavBar';
import News from './comp/News';


class App extends Component {
    render() {
        return (
            <div>
                <News country="us" category="general" />
            </div>
            // <Router>
            //     <div>
            //         <NavBar title="The Daily Brief" />
            //         <Routes>
            //             <Route path="/" element={<News country="us" category="general" />} />
            //             <Route path="/business" element={<News country="us" category="business" />} />
            //         </Routes>
            //     </div>
            // </Router>
        );
    }
}

export default App;