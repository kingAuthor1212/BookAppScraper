import scrapy
import json

class BookpdfspiderSpider(scrapy.Spider):
    name = 'bookpdfspider'
    allowed_domains = ['pdfdrive.com']
    start_urls = ['https://www.pdfdrive.com/']

    def __init__(self, search_query=None, *args, **kwargs):
        super(BookpdfspiderSpider, self).__init__(*args, **kwargs)
        self.search_query = search_query or 'rich dad poor'
        self.book_info = {}

    def parse(self, response):
        search_url = f'https://www.pdfdrive.com/search?q={self.search_query.replace(" ", "+")}'
        yield scrapy.Request(search_url, callback=self.parse_search_results)

    def parse_search_results(self, response):
        book_link = response.xpath('//div[contains(@class, "file-right")]/a/@href').get()
        if book_link:
            book_url = response.urljoin(book_link)
            self.book_info['book_link'] = book_url
            yield scrapy.Request(book_url, callback=self.parse_book_page)

    def parse_book_page(self, response):
        self.book_info['name'] = response.xpath('//h1[@class="ebook-title"]/text()').get().strip()
        self.book_info['image'] = response.urljoin(response.xpath('//img[@class="ebook-img"]/@src').get())
        
        download_link = response.xpath('//a[contains(@class, "btn-download")]/@href').get()
        if download_link:
            download_url = response.urljoin(download_link)
            yield scrapy.Request(download_url, callback=self.final_before_download)
            
    def final_before_download(self, response):
        download_link = response.xpath('//a[@type="button" and @class="btn btn-primary btn-user" and contains(@href, "download.pdf")]/@href').get()
        if download_link:
            self.book_info['download_link'] = response.urljoin(download_link)
            self.parse_book_page()
        
    
    def parse_book_page(self, response):
        self.book_info = {}
        
        # Print response content for debugging
        print(response.text)

        try:
            self.book_info['name'] = response.css('h1.ebook-title::text').get().strip()
        except AttributeError:
            self.book_info['name'] = 'Title not found'

        self.book_info['author'] = response.css('div.ebook-author span::text').get()
        self.book_info['pages'] = response.css('span.info-green::text').re_first(r'(\d+) Pages')

        # Save to JSON file
        with open('book_info.json', 'w') as f:
            json.dump(self.book_info, f)

        yield self.book_info