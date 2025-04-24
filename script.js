const createBtn = document.querySelector('#btn-create');
const downloadBtn = document.querySelector('#btn-download');

const input = document.querySelector('#qrcode-input')

const canvas = document.querySelector('#qrcode-canvas');
const ctx = canvas.getContext('2d');

const createQRCode = () => {
	const text = input.value.trim()
	const encodedText = unescape(encodeURIComponent(text));
	const size = parseInt(document.querySelector("input[name='qrcode-size']:checked").dataset.size);
	
	canvas.width = size;
	canvas.height = size;

	const qr = new QRious({
		level: 'H',
		size: size,
		value: encodedText
	});

	const img = new Image();
	img.src = qr.toDataURL();

	img.onload = () => {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.drawImage(img, 0, 0, size, size);
	  };
};

const downloadQRCode = () => {
	const linkElement = document.createElement('a');

	linkElement.href = canvas.toDataURL('image/png');
	linkElement.download = 'QRcode.png';

	linkElement.click();
}

createBtn.addEventListener('click', createQRCode);
downloadBtn.addEventListener('click', downloadQRCode);