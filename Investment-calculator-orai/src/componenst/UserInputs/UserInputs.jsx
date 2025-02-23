export default function UserInputs({userInput, handlerUserInput}) {

    return (
        <section id="user-input">
            <div className={'input-group'}>
                <p>
                    <label>Initial Investment</label>
                    <input
                        type={'number'}
                        required={true}
                        value={userInput.initialInvestment}
                        onChange={(event) =>
                            handlerUserInput('initialInvestment',
                                event.target.value)}
                    />
                </p>
                <p>
                    <label>Annual Investment</label>
                    <input
                        type={'number'}
                        required={true}
                        value={userInput.annualInvestment}
                        onChange={(event) =>
                            handlerUserInput('annualInvestment',
                                event.target.value)}
                    />
                </p>
            </div>
            <div className={'input-group'}>
                <p>
                    <label>Expected Return</label>
                    <input
                        type={'number'}
                        required={true}
                        value={userInput.expectedReturn}
                        onChange={(event) =>
                            handlerUserInput('expectedReturn',
                                event.target.value)}
                    />
                </p>
                <p>
                    <label>Duration</label>
                    <input
                        type={'number'}
                        required={true}
                        value={userInput.duration}
                        onChange={(event) =>
                            handlerUserInput('duration',
                                event.target.value)}
                    />
                </p>
            </div>
        </section>
    )
};
