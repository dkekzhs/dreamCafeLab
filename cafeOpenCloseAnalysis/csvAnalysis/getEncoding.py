import chardet

def detect_file_encoding(file_path, chunk_size=1024):
    with open(file_path, 'rb') as f:
        chunk = f.read(chunk_size)
        result = chardet.detect(chunk)
        print(file_path)
        print(result['encoding'])

        if result['encoding'].lower() == 'euc-kr':
            result['encoding'] = 'ansi'
        return result['encoding']
