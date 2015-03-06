#
# Copyright Adam Pritchard 2015
# MIT License : http://adampritchard.mit-license.org/
#


PACKAGE_NAME = wysiwyblogger
CHROME_PACKAGE_NAME = $(PACKAGE_NAME)-chrome.zip
SRC_DIR = src

ZIP_ARGS = -r -1

CHROME_INPUT = *

.PHONY: all chrome

chrome:
	rm -f $(CHROME_PACKAGE_NAME); \
	cd $(SRC_DIR); \
	zip $(ZIP_ARGS) "../$(CHROME_PACKAGE_NAME)" $(CHROME_INPUT)

clean:
	rm -f $(CHROME_PACKAGE_NAME)
	find . -name "desktop.ini" -or -name ".*" -and -not -name "." -and -not -name ".git*" -print0 | xargs -0 rm -rf

all: clean chrome mozilla
