// this is configuration file for local-web-server module

import { get } from 'http';
import os from 'os';

const interfaces = os.networkInterfaces();

const localIp = Object.values(interfaces)
	.flat()
	.find(({ family, internal }) => family === 'IPv4' && !internal)?.address;

const stack = [
	// this only logs the request, here for future ref
	'.server/lws.plugin.mjs',

	// DEFAULT STACK
	// 'lws-basic-auth',
	// 'lws-body-parser',
	// 'lws-request-monitor',
	// 'lws-log',
	// 'lws-cors',
	// 'lws-json',
	// 'lws-compress',
	'lws-rewrite',

	// 'lws-blacklist',
	// 'lws-conditional-get',
	// 'lws-mime',
	// 'lws-range',
	// 'lws-spa',
	'lws-static',
	// 'lws-index',
];

const { key, cert } = getCerts();

export default {
	// hostname: localIp || '127.0.0.1',
	port: 8000,
	//https: { key, cert },
	rewrite: [{ from: '^/(.*)/$', to: '/$1/index.html' }],
	stack,
};

/*
basic self-signed cert, does the trick if you proceed past the warning

got via
openssl req -newkey rsa:2048 -nodes -keyout key.pem -x509 -days 365 -out cert.pem
*/
function getCerts() {
	const key = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCi49LqgH2xettG
C8EXYYnVYCherKCl6Nb+0LbejThUgCZxLW4fae0q+8HtXNbP9rEuGIXNbijOlEYV
3zlMu87OGQ8vzRtFqYBtAQNANcrZLJHZbDBQ/vjMlRRKx01+jDUKPVwMrg8q4ZUf
kqYQxL9Qds2NBoPMm08Ha0+O5gz5984vVQ8esQUSAmrmWiWytF8OeIbU7wMMoNRn
bPIUHoSXFu9Df1Iso3cLq425/7J2wZJWgCyi/WIrVB3Wra+yIxcxpZxx7pmdZCw9
dDyEH3ObOy1f7EoXC000A04ogv4foN8rHfeWJi3t1iXO6PgJReMcoJ+pO2aV4tJ5
i7cLGL+1AgMBAAECggEAA5yDd5mDr+SmaeYm0Mrj0GxCWN8A7My9v4aHF2YQIqd4
sresIlwp2vMb+JQ/WvsAMKJwjP5tPy9AYonBbncXfbBGiuvEOAYrB7+m/8xxg+Ee
FrD0XUdZ4sdHXOUQTcb0AhccLFfLlErOEJYiwmpqR3Fq2z6Su32SAfsaF3P4Q652
vt9GxYxRNFnb00lhCAvVQDXrqelDsGgIWemX/p8e17YwsNQNkuH5bcFCtLT6RKSj
V24FyKvRCAh/2oSccECMOwX5Gii0FvQOYly5HlGE+smK/I9qgWfJMiTbayLbflUg
gcobW56NnX895yVoATIYAGb8Kpui3zLAeqp/Vg5WXQKBgQDUlaRU9IpkBViCb3YE
ei33wbkgqccuiw6VoKf0qivqL0MgbmvvsXEw27D99fmUixMeKyt98WdhVIdyGgou
yjfjk9+wik4oOK6B4XH9LELAXqBMEW0CViN0sftIFicH6XUNTPEB1GHa1qXrZJAw
K3UBhlCw07pMvnJFhJlJrsuEowKBgQDEKAuz2lKLFaNbqk1B6qyVdAHYA+Dlp4Ak
AXMUR79AOjBpWGFdYhTLyPbHzIlhd5czJOyEo4+2g7jIGZVqjeO3etopMdX1xTwJ
bUGXE73QmyAeErLkPT4ST0e0UnFYfZgG6jlxfRHOPJC1U2NTTPkEYoP78Y2GlAa4
DI9o274XxwKBgBbrk249d3ZVRTe7AMR2z+H4lxc4dutDvuzPB4zPlDCJq/khLq4H
OacE6M5Y6PHlFMiZ6vSHRJgv3vKkcBifYOs+lE2ae9bGVbpXLk0XqpLHIQ1Si6hG
1UfNsMQS715hA2fNteZ2mZ5Yqkb47rri1Ji3fJe0HFAN8JAiPcy99d91AoGBAJwY
5h8s+Qz3njUfFDYFg2u3kpQNmhYHsqB0itizs81vwQDENU8z8yqsdT5QVW871RX9
Jz7yTjZHInASc+YEnhdv61Zm80aOu5Ug3dZU/nOYTvm/lZ6t4cx+TKiCBvMNl0LB
eA8JIXdGmT3C60Lp+Sx1HWUMN7zF5Ybnb+RZIjAXAoGAIdsD64J+8KCdd+hHVS6b
rcAIR53TkEKSRuNb14tkGC7HFqmQB3M7qkimZLvlQggj0bTA7wxFRwXgvGpOnDPq
gAmGeeojXKbtwcSaS44KLJqAUKHncEH35A0BIKpko83VC8y7dJtXUXYYVqrkvvWU
6b5IOwPR0ABVdxYqFVbYTgU=
-----END PRIVATE KEY-----`;

	const cert = `-----BEGIN CERTIFICATE-----
MIIC3jCCAcYCCQCK8hFkvdzI5zANBgkqhkiG9w0BAQsFADAxMQswCQYDVQQGEwJV
UzEQMA4GA1UECAwHR2VvcmdpYTEQMA4GA1UEBwwHQXRsYW50YTAeFw0yNTAzMjkw
MTIzMzdaFw0yNjAzMjkwMTIzMzdaMDExCzAJBgNVBAYTAlVTMRAwDgYDVQQIDAdH
ZW9yZ2lhMRAwDgYDVQQHDAdBdGxhbnRhMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8A
MIIBCgKCAQEAouPS6oB9sXrbRgvBF2GJ1WAoXqygpejW/tC23o04VIAmcS1uH2nt
KvvB7VzWz/axLhiFzW4ozpRGFd85TLvOzhkPL80bRamAbQEDQDXK2SyR2WwwUP74
zJUUSsdNfow1Cj1cDK4PKuGVH5KmEMS/UHbNjQaDzJtPB2tPjuYM+ffOL1UPHrEF
EgJq5lolsrRfDniG1O8DDKDUZ2zyFB6ElxbvQ39SLKN3C6uNuf+ydsGSVoAsov1i
K1Qd1q2vsiMXMaWcce6ZnWQsPXQ8hB9zmzstX+xKFwtNNANOKIL+H6DfKx33liYt
7dYlzuj4CUXjHKCfqTtmleLSeYu3Cxi/tQIDAQABMA0GCSqGSIb3DQEBCwUAA4IB
AQCAg+MM/lSV/pS4eloFdL1B9pnIG14DYvGPqd2fXAxKBtYfSt7BodW+hFA5SwX+
mDqufwMvVEW4o0LCNw4BjvOxj3xyYoaXpF63onxUyALGl26ryapTFKxf7y+gZTeQ
DW6X28vR19j4nHUTAUZmvyehCN1fVjZsrANX/6PYKGjkdBme1EETMFvTcNZzMV1m
43fES9fFyxeSaN0z0hnrq/wFfjkUQ+BCNDPpJ0JMadQLGLj/93Y7P0nNMD+vY+bk
hy8bUGQf2xjksy/ZLpVrQ3+VoGeOXyohCv3NDu1XX9LnbccJ2LVnK9Hf2FDzKOIq
XncijQwAYc/bHarrTd3bp9vW
-----END CERTIFICATE-----`;
	return { key, cert };
}
