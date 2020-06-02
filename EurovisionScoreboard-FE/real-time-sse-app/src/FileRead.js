const ImportFromFileBodyComponent = () => {
    let fileReader;

    const handleFileRead = (e) => {
        const content = fileReader.result;
        console.log(content)
        // … do something with the 'content' …
    };

    const handleFileChosen = (file) => {
        fileReader = new FileReader();
        fileReader.onloadend = handleFileRead;
        fileReader.readAsText(file);
    };

    return ;
};