import React, {PureComponent} from 'react';
import Typography from '@material-ui/core/Typography';
import Charts from '../../components/Charts';

import './index.scss';

export default class Monitoring extends PureComponent {
    render() {
        return (
            <div className='monitoring'>
                <Charts />
            </div>
        );
    }
}
