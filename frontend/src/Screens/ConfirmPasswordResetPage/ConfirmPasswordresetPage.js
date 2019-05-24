
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '../../Components/Button/Button';
import InputField from '../../Components/Input/InputField';
import Form from '../../Components/Form/Form';
import Layout from '../../Components/Layout/Layout';
import logo from '../../assests/czasoprzestrzen_logo.png';
import { resetPasswordConfirm } from '../../services/userService';
import ErrorDisplay from '../../Components/Displays/ErrorDisplay';
import TextButton from '../../Components/Button/TextButton';
import '../../App.css';

const styles = theme => ({
    formControl: {
        width: '100%',
        minWidth: 120,
    },
});

class LoginPage extends React.Component {

    state = {
        token: '',
        password: '',
        repeatPassword: '',
        resetError: false,
        message: ''
    }



    handleChangeToken = event => {
        this.setState({ token: event.target.value });
    }

    handleChangePassword = event => {
        this.setState({ password: event.target.value });
    }

    handleChangePasswordRepeat = event => {
        this.setState({ repeatPassword: event.target.value });
    }

    tryReset = async e => {

        e.preventDefault();
        const { token, password, repeatPassword } = this.state;
        if (this.checkPassword(password, repeatPassword)) {
            console.log(token + password)
            const response = await resetPasswordConfirm(token, password);
            if (response) {
                this.props.history.push('/login');
            } else {
                this.setState({ resetError: true, message: "Coś poszło nie tak" })
            }
        }
        else {
            this.setState({ resetError: true, message: "Hasła muszą być takie same" })
        }
    }

    checkPassword(password, repeatPassword) {
        return password === repeatPassword;
    }


    render() {
        const header = <img src={logo} className='LogoStart' alt="Logo" />;
        const button = <div><Button link={'/home'} text={"Resetuj hasło"} onClick={this.tryReset}></Button>
        <TextButton link={'/login'} text={"Powrót do logowania"}></TextButton></div>;

        return (
            <div>
                <Layout layoutDivide={"363"}>
                    <Form header={header} button={button} >

                    <div className="resetPasswordInsctructions">
                    Wprowadź nowe hasło oraz podaj token, który otrzymałeś w wiadomości e-mail.
                    </div>

                        <InputField placeholder={"Token"} rows={"1"} onChange={this.handleChangeToken}>
                        </InputField>

                        <InputField placeholder={"Hasło"} type={"password"} onChange={this.handleChangePassword}>
                        </InputField>

                        <InputField placeholder={"Powtórz hasło"} type={"password"} onChange={this.handleChangePasswordRepeat}>
                        </InputField>


                    </Form>
                </Layout>

                {this.state.resetError &&
                    <ErrorDisplay
                        removeError={id => { this.setState({ resetError: false }) }}
                        errors={[{ message: this.state.message, id: 100 }]}
                    />}
            </div>
        );
    }
}

LoginPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginPage);