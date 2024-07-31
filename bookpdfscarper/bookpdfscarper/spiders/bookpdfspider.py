from flask import app
from requests import request
import scrapy
from scrapy.selector import Selector
import re


@app.route("/", methods=["GET"])

class BookpdfspiderSpider(scrapy.Spider):
    name = 'bookpdfspider'
    allowed_domains = ['pdfdrive.com']
    start_urls = ['https://www.pdfdrive.com/']

    def parse(self, response):
        # Search for "rich dad poor" on the homepage
        search_url = 'https://www.pdfdrive.com/search?q=rich+dad+poor'
        yield scrapy.Request(search_url, callback=self.parse_search_results)

    def parse_search_results(self, response):
        # Find the link to the "Rich Dad Poor Dad" book page
        book_link = response.xpath('//a[contains(@href, "rich-dad-poor-dad-e")]/@href').get()
        if book_link:
            book_url = response.urljoin(book_link)
            yield scrapy.Request(book_url, callback=self.parse_book_page)

    def parse_book_page(self, response):
        # Find the download link on the book page
        download_link = response.xpath('//a[contains(@href, "rich-dad-poor-dad-d")]/@href').get()
        if download_link:
            download_url = response.urljoin(download_link)
            yield scrapy.Request(download_url, callback=self.parse_download_page)
            
    def parse_download_page(self, response):
        # Find the final download URL on the download page
        download_link = response.css('a[onclick*="AiD("]::attr(href)').get()
        print(download_link)
        if download_link:
            print(f"Download link: {download_link}")
            
        # download_button = response.xpath('//div[@class="btn-group"]//a[@type="button" and @class="btn btn-primary btn-user" and contains(@href, "download.pdf")]/@href').get()
        # if download_button:
        #     download_url = response.urljoin(download_button)
        #     yield scrapy.Request(download_url, callback=self.save_pdf)
        # else:
        #     self.logger.warning("Failed to find the download link on the page")
            
    # def parse_download_page(self, response):
    #     # Find the final download URL on the download page
    #     download_url = response.xpath('//a[contains(@href, "download.pdf")]/@href').get()
    #     print(download_url)
    #     if download_url:
    #         yield scrapy.Request(response.urljoin(download_url), callback=self.save_pdf)
    #     else: print("did reach but failed to get the href to download the book")
            
    # def parse_bok_page(self, response):
    #     # Find the download link button on the book page
    #     download_link = response.xpath('//div[@class="btn-group"]//a[@type="button" and @class="btn btn-primary btn-user" and contains(@href, "download.pdf")]/@href').get()
    #     print(response)
    #     if download_link:
    #         download_url = response.urljoin(download_link)
    #         yield scrapy.Request(download_url, callback=self.save_pdf)
    #     else: print("didnt get anything")

    def save_pdf(self, response):
        # Save the PDF file
        path = re.findall(r'/([\w_-]+\.pdf)', response.url)[0]
        self.logger.info(f'Saving PDF: {path}')
        with open(path, 'wb') as f:
            f.write(response.body)