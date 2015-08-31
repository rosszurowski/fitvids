
#
# Binaries
#

export PATH := ./node_modules/.bin:${PATH}
BIN := ./node_modules/.bin

#
#
#

build: node_modules index.js
	@browserify index.js --standalone fitvids -o fitvids.js
	@uglifyjs fitvids.js -o fitvids.min.js

node_modules: package.json
	@npm install
	@touch node_modules

test:
	@hihat test.js -p tap-dev-tool

lint:
	@xo index.js test.js

size: build
	@cat fitvids.js | gzip -9 | wc -c
