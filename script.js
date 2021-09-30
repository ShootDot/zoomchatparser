function parseText() {
    let author = document.getElementById('author').value
    if (!document.getElementById('selector').files[0]) return alert('Please upload a text file to continue')
    if (!author) return alert('Please fill the author field');
    var fr = new FileReader();
    fr.readAsText(document.getElementById('selector').files[0]);
    fr.onload = function() {
        let meta = false;
        let lastMeta;
        let html = ``;
        let next = false;
        let seperator = fr.result.split('\n')
        for (let i in seperator) {
            if (!seperator[i].startsWith('\t')) {
                if (!meta) meta = true;
                if (seperator[i].includes(`From ${author}`)) { next = true } else { next = false }
                html += `<p class="meta"> ${seperator[i]} </p>`
                lastMeta = seperator[i]
            } else {
                if (!meta) html += `<p class="meta"> ${lastMeta} </p>`
                next ? html += `<p class="me">${seperator[i]}</p>` : html += `<p class="text">${seperator[i]}</p>`
                meta = false;
            }
        }
        document.getElementById('output').innerHTML = html
    }
}