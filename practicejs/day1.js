async function getData() {
    try {
        const res = await fetch('apiurl');

        const data = await res.json();
        console.log(data);
    } catch (error) {
        console.error("erro", error);
    }
}
getData();

// now post req

async function PostDara(params) {
    try {
        const res = await fetch('apiurl', {
            method: 'POST',
            headers: {

            },

            body: JSON.stringify({
                title: 'hellow',
                body: 'word',
                userId: 1
            })
        });


        const data = await res.json();
        console.log(data);
    } catch (error) {

    }

}