from setuptools import setup, find_packages

setup(
    name="newstock_scraper",
    version="0.1",
    packages=find_packages(where="src"),
    package_dir={"": "src"},
    install_requires=[],  # 필요한 패키지를 여기에 나열
)