
TESTS = test/*.js
REPORTER = dot

all: chai.js

#
# Node Module
#

node_modules: package.json
	@npm install

#
# Browser Build
# 

chai.js: node_modules lib/* components
	@printf "==> [Browser :: build]\n"
	@./node_modules/.bin/component-build -s chai -o .
	@mv build.js chai.js

#
# Components
# 

build: components lib/*
	@printf "==> [Component :: build]\n"
	@./node_modules/.bin/component-build --dev

components: node_modules component.json
	@printf "==> [Component :: install]\n"
	@./node_modules/.bin/component-install --dev

#
# Tests
# 

test: test-node test-browser

test-node: node_modules
	@printf "==> [Test :: Node.js]\n"
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--require ./test/bootstrap \
		--reporter $(REPORTER) \
		$(TESTS)

test-browser: build
	@printf "==> [Test :: Karma (PhantomJS]\n"
	@./node_modules/.bin/karma start \
		--browsers PhantomJS \
		--single-run

test-cov: lib-cov 
	@CHAI_COV=1 NODE_ENV=test ./node_modules/.bin/mocha \
		--require ./test/bootstrap \
		--reporter html-cov \
		$(TESTS) \
		> coverage.html

test-travisci: test-node test-browser lib-cov
	@echo TRAVIS_JOB_ID $(TRAVIS_JOB_ID)
	@CHAI_COV=1 NODE_ENV=test ./node_modules/.bin/mocha \
		--require ./test/bootstrap \
		--reporter mocha-lcov-reporter \
		$(TESTS) \
		| ./node_modules/coveralls/bin/coveralls.js
	
#
# Coverage
# 

lib-cov: 
	@rm -rf lib-cov
	@./node_modules/jscoverage/bin/jscoverage lib lib-cov

#
# Clean up
# 

clean: clean-node clean-browser clean-components clean-cov

clean-node:
	@rm -rf node_modules

clean-browser:
	@rm -f chai.js

clean-components:
	@rm -rf build
	@rm -rf components

clean-cov:
	@rm -rf lib-cov
	@rm -f coverage.html

#
# Instructions
#

.PHONY: all 
.PHONY: test test-all test-node test-browser test-component test-cov 
.PHONY: clean clean-node clean-browser clean-components clean-cov 
