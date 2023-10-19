document.addEventListener("DOMContentLoaded", function() {
    loadAuctions();
});


function loadAuctions() {
    fetch('http://127.0.0.1:8000/api/auction')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const auctionList = document.getElementById('card-wrapper');
            auctionList.innerHTML = '';

            data.data?.map((auction, index) => {
                // const auctionItem = document.createElement('div');
                auctionList.innerHTML = `
                    <p>Lelang: ${auction.title}</p>
                    <p>Deskripsi Lelang: ${auction.description}</p>
                    <p>Barang: ${auction.user_id}</p>
                `;
                // auctionList.appendChild(auctionItem);
            });
        })
        .catch(error => console.error(error));
}
