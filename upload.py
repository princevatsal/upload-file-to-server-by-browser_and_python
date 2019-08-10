import requests
url='http://localhost:3000/uploadfile'
location_of_file=input('Enter loaction of file:')
file=open(location_of_file,'rb')
files={'myFile':file}
r=requests.post(url,files=files)
print(r.text)