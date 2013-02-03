
TESTS = test/*.js
REPORTER = spec

all: chai.js

chai.js: 
	@node support/compile

#
# Tests
# 

test: test-node

test-node:
	@printf "\n  ==> [Node.js]"
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--require ./test/bootstrap \
		--reporter $(REPORTER) \
		--ui tdd \
		$(TESTS)

test-browser: chai.js has-phantomjs
	@printf "\n  ==> [Browser Build via PhantomJS]"
	@./node_modules/.bin/mocha-phantomjs \
		--R ${REPORTER} \
		./test/browser/index.html

test-component: build has-phantomjs
	@printf "\n  ==> [Component Build via PhantomJS]"
	@./node_modules/.bin/mocha-phantomjs \
		--R ${REPORTER} \
		./test/browser/component.html

test-cov: lib-cov
	@CHAI_COV=1 NODE_ENV=test ./node_modules/.bin/mocha \
		--require ./test/bootstrap \
		--reporter html-cov \
		--ui tdd \
		$(TESTS) \
		> coverage.html

#
# Components
# 

build: components lib/*
	@./node_modules/.bin/component-build --dev

components: component.json
	@./node_modules/.bin/component-install --dev

#
# Coverage
# 

lib-cov: clean-cov
	@jscoverage lib lib-cov

#
# Clean up
# 

clean: clean-browser clean-components clean-cov

clean-browser:
	@rm -f chai.js

clean-components:
	@rm -rf build
	@rm -rf components

clean-cov:
	@rm -rf lib-cov
	@rm -f coverage.html

#
# Utils
#

has-phantomjs:
ifeq ($(shell which phantomjs),)
	$(error PhantomJS is not installed. Download from http://phantomjs.org or Homebrew)
endif

.PHONY: all clean clean-browser clean-components clean-cov test test-cov test-node 
