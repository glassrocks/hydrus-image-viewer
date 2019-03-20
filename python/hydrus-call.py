import hydrus
import sys


def main(apiCall):
    client = hydrus.Client()
    api_ver = client.api_version
    if (apiCall == 'api_ver'):
        print('api version:', api_ver)
    else:
        print('no')


# driver code
if __name__ == '__main__':
    main(sys.argv[1])
